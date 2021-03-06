import path from 'path';

process.noDeprecation = true;

const ROOT_PATH = path.resolve(__dirname, '../');
const NODE_PATH = path.resolve(ROOT_PATH, 'node_modules');
const GroupConf = (chunkName, regExpkey, isPages) => ({
    name: chunkName,
    chunks: 'async',
    test: (module) => {
        const reg = new RegExp(`\/${isPages ? 'src\/pages' : 'node_modules'}\/${regExpkey}`);
        return reg.test(module.context);
    },
    priority: 20,
    maxAsyncRequests: 10,
    maxInitialRequests: 10,
    reuseExistingChunk: true
});

export default {
    hash: true,
    outputPath: '/dist/assets/',
    publicPath: '/assets/',
    urlLoaderExcludes: [/.svg$/],
    ignoreMomentLocale: true,
    chainWebpack(config) {
        config.merge({
            optimization: {
                splitChunks: {
                    chunks: 'async',
                    minSize: 0,
                    minChunks: 1,
                    maxAsyncRequests: 10,
                    maxInitialRequests: 10,
                    cacheGroups: {
                        antd: GroupConf('antd', 'antd\/'),
                        antdm: GroupConf('antdm', 'antd-mobile'),
                        antrc: GroupConf('antrc', 'rc-.*'),
                        antrmc: GroupConf('antrmc', 'rmc-.*'),
                        draft: GroupConf('draft', 'draft-js'),
                        immutable: GroupConf('immutable', 'immutable'),
                        corePlugs: GroupConf('corePlugs', '(zrender.*|lodash.*|moment)'),
                        pages: GroupConf('pages', '[^fullScreen]', true)
                    }
                }
            },
            resolve: {
                alias: {
                    '@utils': path.resolve(ROOT_PATH, 'src/utils'),
                    '@pages': path.resolve(ROOT_PATH, 'src/pages'),
                    '@components': path.resolve(ROOT_PATH, 'src/components'),
                    '@globalModels': path.resolve(ROOT_PATH, 'src/models'),
                    '@globalServices': path.resolve(ROOT_PATH, 'src/services')
                }
            },
            module: {
                rule: {
                    'svg-oader': {
                        test: /\.svg$/,
                        use: {
                            'svg-inline-loader': {
                                loader: 'svg-inline-loader',
                                options: {
                                    removeTags: true
                                }
                            }
                        }
                    },
                    'px2rem-loader': {
                        test: /\.(less|tsx|ts)$/,
                        use: {
                            'webpack-px2rem-loader': {
                                loader: 'webpack-px2rem-loader',
                                options: {
                                    // 1rem=npx ????????? 10
                                    basePx: 100,
                                    // ??????????????????min???px ?????????0
                                    // ???????????????px?????????border???1px????????????rem???????????????????????????????????????1px??????????????????????????????
                                    min: 1,
                                    // ????????????rem?????????????????????????????? ?????????3
                                    floatWidth: 3
                                }
                            }
                        },
                        include: [
                            path.resolve(ROOT_PATH, 'src')
                        ],
                        exclude: [
                            NODE_PATH,
                            path.resolve(ROOT_PATH, 'src/global.less')
                        ]
                    }
                }
            }
        });
    }
};
