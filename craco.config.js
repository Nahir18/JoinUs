const path = require(`path`);

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        alias: {
            '@': resolvePath( 'src/'),
            '@Components': resolvePath( 'src/components'),
            '@Styles': resolvePath( 'src/styles'),
            '@Utils': resolvePath( 'src/utils'),
            '@constants': resolvePath( 'src/constants'),
            '@Core': resolvePath( 'src/Core'),
            '@Pages': resolvePath( 'src/pages'),
            '@Store': resolvePath( 'src/Store'),
        }
    },
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
};
