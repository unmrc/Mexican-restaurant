const
	action = require( 'tempaw-zemez-functions' ).action,
	preset = require( 'tempaw-zemez-functions' ).preset;

module.exports = {
	livedemo: {
		enable: true,
		server: {
			baseDir: `dev/`,
			directory: false
		},
		port: 8000,
		open: false,
		notify: true,
		reloadDelay: 0,
		ghostMode: {
			clicks: false,
			forms: false,
			scroll: false
		}
	},
	sass: {
		enable: true,
		showTask: false,
		watch: `dev/scss/**/*.scss`,
		source: [
			`dev/scss/bootstrap/bootstrap.scss`,
			`dev/scss/custom/style.scss`,
			`dev/scss/fonts/fonts.scss`
		],
		dest: `dev/css/`,
		options: {
			outputStyle: 'expanded',
			indentType: 'tab',
			indentWidth: 1,
			linefeed: 'cr'
		}
	},
	pug: {
		enable: true,
		showTask: false,
		watch: `dev/pug/**/*.pug`,
		source: `dev/pug/pages/!(_)*.pug`,
		dest: `dev/`,
		options: {
			pretty: true,
			verbose: true,
			self: true,
			emitty: true
		}
	},
	autoprefixer: {
		enable: false,
		options: {
			cascade: true,
			browsers: ['Chrome >= 45', 'Firefox ESR', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 9', 'Safari >= 9', 'Android >= 4.4', 'Opera >= 30']
		}
	},
	watcher: {
		enable: true,
		watch: `dev/js/**/*.js`
	},
	lint: {
		showTask: true,
		full: true,
		html: 'dev/**/*.html'
	},
	cache: {
		showTask: false,
	},
	buildRules: {
		'build-TM': [
			preset.buildMonster({
				clean: true,
				livedemo: true,
				granter: true,
				builder: false,
				granterPsd: true,
				minifyimg: true,
				delPresets: false
			})
		],
		'build-TF': [
			preset.buildForest({
				clean: true,
				livedemo: true,
				userPackage: true,
				minifyimg: true,
				delPresets: false,
				placeholder: {
					exclusions: [
						'_blank',
						'gmap*',
						'logo*',
						'sprite*',
						'warning_bar_0000_us',
						'isotope-loader',
						'mCSB_buttons',
						'preloader',
						'video-play',
						'vimeo-play',
						'youtube-play'
					]
				}
			}),
			// Copy sources
			action.copy({
				src: [
					'dev/**/*.pug',
					'dev/**/*.scss'
				],
				dest: 'dist/user-package/sources'
			}),
		],
		'build-advanced': [
			// Очистка дистрибутива
			action.clean({ src:`dist/!(.)*` }),


			// TM Live Demo Site
			preset.buildLiveDemo({
				src: 'dev',
				dest: 'dist/TM/livedemo/site',
				minifyimg: true,
				delPresets: true
			}),

			// TM Live Demo Builder
			preset.buildBuilder({
				src: `builder/**/*`,
				dest: `dist/TM/livedemo/builder`,
				dev: `dev`,
				demoMode: true,
				ldPassword: true,
				pages: [
					'about',
					'contacts',
					'index',
					'masonry-blog',
					'masonry-gallery',
					'privacy-policy',
					'search-results',
					'services',
					'single-post',
					'single-service',
					'team-member',
					'team'
				]
			}),

			// TM Granter Site and Sources
			preset.buildGranter({
				src: 'dev',
				minifyimg: true,
				delPresets: true,
				dest: {
					site: 'dist/TM/granter/site',
					sources: 'dist/TM/granter/sources'
				}
			}),

			// TM Granter Builder
			preset.buildBuilder({
				src: `builder/**/*`,
				dest: `dist/TM/granter/builder`,
				dev: `dev`,
				pages: [
					'about',
					'contacts',
					'index',
					'masonry-blog',
					'masonry-gallery',
					'privacy-policy',
					'search-results',
					'services',
					'single-post',
					'single-service',
					'team-member',
					'team'
				]
			}),
			action.copy({ // Копирование документации билдера
				src: [ `sources/build-specific/Documentation.pdf`, `sources/build-specific/Documentation.url` ],
				dest:`dist/TM/granter/builder-documentation/`
			}),


			// TF Live Demo Site
			preset.buildLiveDemo({
				src: `dev/`,
				dest: `dist/TF/livedemo/site/`,
				marker: 'TF_DEMO',
				minifyimg: true,
				delPresets: true
			}),
			action.copy({ // Замена логотипа и фавиконки
				src: [ `sources/build-specific/logo-219x57.png`, `sources/build-specific/favicon.ico` ],
				dest: `dist/TF/livedemo/site/images/`
			}),
			action.copy({ // Замена первой картинки в слайдере
				src: `sources/build-specific/slide-01.jpg`,
				dest: `dist/TF/livedemo/site/images/intros/`
			}),

			// TF Live Demo Builder
			preset.buildBuilder({
				src: `builder/**/*`,
				dest: `dist/TF/livedemo/builder/`,
				dev: `dev`,
				marker: 'TF_BUILDER',
				demoMode: true,
				ldPassword: true,
				pages: [
					'about',
					'contacts',
					'index',
					'masonry-blog',
					'masonry-gallery',
					'privacy-policy',
					'search-results',
					'services',
					'single-post',
					'single-service',
					'team-member',
					'team'
				]
			}),
			action.copy({ // Замена логотипа и фавиконки
				src: [ `sources/build-specific/logo-219x57.png`, `sources/build-specific/favicon.ico` ],
				dest: `dist/TF/livedemo/builder/projects/template/images/`
			}),
			action.copy({ // Замена первой картинки в слайдере
				src: `sources/build-specific/slide-01.jpg`,
				dest: `dist/TF/livedemo/builder/projects/template/images/intros/`
			}),
			action.copy({ // Замена превью домашних страниц
				src: `sources/build-specific/home.png`,
				dest: `dist/TF/livedemo/builder/projects/template/novi/pages/`
			}),

			// TF User Package Site
			preset.buildUserPackage({
				enable: true,
				src: 'dev',
				dest: 'dist/TF/user-package/site/',
				minifyimg: true,
				delPresets: true,
				placeholder: {
					exclusions: [
						'_blank',
						'gmap*',
						'logo*',
						'sprite*',
						'warning_bar_0000_us',
						'isotope-loader',
						'mCSB_buttons',
						'preloader',
						'video-play',
						'vimeo-play',
						'youtube-play',
						'633328'
					]
				}
			}),
			action.copy({ // Замена логотипа и фавиконки
				src: [ `sources/build-specific/logo-219x57.png`, `sources/build-specific/favicon.ico` ],
				dest: `dist/TF/user-package/site/images/`
			}),

			// TF User Package Documentation
			action.copy({
				src: `sources/documentation/*.*`,
				dest: `dist/TF/user-package/documentation/`
			}),
			action.copy({
				src: `sources/documentation/!(scss|pug)/**/*`,
				dest: `dist/TF/user-package/documentation/`
			}),

			// TF User Package Builder
			preset.buildBuilder({
				src: `builder/**/*`,
				dest: `dist/TF/user-package/builder`,
				dev: `dev`,
				marker: 'TF_BUILDER',
				pages: [
					'about',
					'contacts',
					'index',
					'masonry-blog',
					'masonry-gallery',
					'privacy-policy',
					'search-results',
					'services',
					'single-post',
					'single-service',
					'team-member',
					'team'
				]
			}),
			action.copy({ // Замена превью домашних страниц
				src: `sources/build-specific/home.png`,
				dest: `dist/TF/user-package/builder/projects/template/novi/pages`
			}),
			action.copy({ // Замена логотипа и фавиконки
				src: [ `sources/build-specific/logo-219x57.png`, `sources/build-specific/favicon.ico` ],
				dest: `dist/TF/user-package/builder/projects/template/images/`
			}),
			action.imgPlaceholder({ // Замена картинок на плейсхолдеры
				src: function() {
					var exclusions = [
						'_blank',
						'gmap*',
						'logo*',
						'sprite*',
						'warning_bar_0000_us',
						'isotope-loader',
						'mCSB_buttons',
						'preloader',
						'video-play',
						'vimeo-play',
						'youtube-play'
					];
					return `dist/TF/user-package/builder/projects/template/images/**/!(${exclusions.join('|')}).@(png|jpg)`;
				}()
			}),

			// TF User Package Builder Documentation
			action.copy({
				src: [ `sources/build-specific/Documentation.pdf`, `sources/build-specific/Documentation.url` ],
				dest:`dist/TF/user-package/builder-documentation/`
			}),


			// RU Live Demo Site
			preset.buildLiveDemo({
				src: 'dev-ru',
				dest: 'dist/RU/livedemo/site',
				minifyimg: true,
				delPresets: true
			}),

			// RU Live Demo Builder
			preset.buildBuilder({
				src: `builder/**/*`,
				dest: `dist/RU/livedemo/builder`,
				dev: `dev-ru`,
				demoMode: true,
				ldPassword: true,
				lang: 'ru',
				pages: [
					'about',
					'contacts',
					'index',
					'masonry-blog',
					'masonry-gallery',
					'privacy-policy',
					'search-results',
					'services',
					'single-post',
					'single-service',
					'team-member',
					'team'
				]
			}),

			// RU Granter Site and Sources
			preset.buildGranter({
				src: 'dev-ru',
				minifyimg: true,
				delPresets: true,
				dest: {
					site: 'dist/RU/granter/site',
					sources: 'dist/RU/granter/sources'
				},
			}),

			// RU Granter Builder
			preset.buildBuilder({
				src: `builder/**/*`,
				dest: `dist/RU/granter/builder`,
				dev: `dev-ru`,
				lang: 'ru',
				pages: [
					'about',
					'contacts',
					'index',
					'masonry-blog',
					'masonry-gallery',
					'privacy-policy',
					'search-results',
					'services',
					'single-post',
					'single-service',
					'team-member',
					'team'
				]
			}),
			action.copy({ // Копирование документации билдера
				src: [ `sources/build-specific/Documentation.pdf`, `sources/build-specific/Documentation.url` ],
				dest:`dist/RU/granter/builder-documentation/`
			})
		],
		'update-bs4': [
			preset.updBs4({
				general: true,
				offsets: false
			})
		],
		'update-bs5': [
			preset.updBs5()
		],
		'bulder-throw': [
			preset.builderThrow({
				dev: 'dev',
				builder: 'builder',
			})
		],
		'util-backup': [
			action.pack({
				src: [ 'dev/**/*', '*.*' ], dest: 'versions/',
				name( dateTime ) { return `backup-${dateTime[0]}-${dateTime[1]}.zip`; }
			})
		]
	}
};
