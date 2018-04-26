const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const yaml = require('js-yaml');
const MarkdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const nib = require('nib');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

const isProd = process.env.NODE_ENV === 'production';

const md = new MarkdownIt({
    html: true,
    breaks: true,
    typographer: true
});
md.use(markdownItAttrs);

const paths = {
    root: path.join(__dirname, '../'),
    src: path.join(__dirname, '../src/'),
    scripts: 'src/scripts/*.js',
    styles: 'src/styles/**/*.styl',
    assets: path.join(__dirname, '../src/assets'),
};

gulp.task('scripts', () => {
    // noinspection JSAnnotator
    return gulp.src(paths.scripts)
        .pipe($.uglify())
        .pipe($.concat({path: 'main.min.js', stat: {mode: 0666}}))
        .pipe(gulp.dest('dist/assets/'))
        .pipe($.size())
});

gulp.task('materialize', () => {
    return gulp.src('src/assets/materialize/*/*')
        .pipe(gulp.dest('dist/assets/materialize/'))
        .pipe($.size());
});

gulp.task('images', () => {
    return gulp.src('src/assets/images/*')
        .pipe(gulp.dest('dist/assets/images/'))
        .pipe($.size())
});

gulp.task('styles', () => {
    // noinspection JSAnnotator
    return gulp.src(paths.styles)
        .pipe($.stylus({use: nib(), compress: true, import: ['nib']}))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.concat({path: 'styles.css', stat: {mode: 0666}}))
        .pipe(gulp.dest('dist/assets/'))
        .pipe($.size())
});

gulp.task('fonts', ()=> {
    return gulp.src('node_modules/font-awesome/*/**')
        .pipe(gulp.dest('dist/assets/fonts/'))
        .pipe($.size());
});

gulp.task('jquery', ()=> {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/assets/'))
        .pipe($.size());
});

gulp.task('html', () => {
    const MarkdownType = new yaml.Type('tag:yaml.org,2002:md', {
        kind: 'scalar',
        construct: function (text) {
            return md.render(text)
        },
    });
    const YAML_SCHEMA = yaml.Schema.create([MarkdownType]);
    const context = matter(fs.readFileSync('data.yaml', 'utf8'), {schema: YAML_SCHEMA}).data;
    return gulp.src(['template/index.html', 'template/print.html'])
        .pipe($.nunjucks.compile(context))
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe($.size())
});

gulp.task('default', ['materialize', 'images', 'scripts', 'styles', 'fonts', 'jquery', 'html'], () => {
    if (isProd) return;
    browserSync.init({
        server: "./dist"
    });
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(['template/*.html', 'data.yaml'], ['html']);
    gulp.watch(["dist/*.html", "dist/assets/*.*"]).on('change', browserSync.reload)
});
