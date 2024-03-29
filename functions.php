<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 */

// Load Composer dependencies.
require_once __DIR__ . '/vendor/autoload.php';

require_once __DIR__ . '/src/StarterSite.php';

Timber\Timber::init();

// Sets the directories (inside your theme) to find .twig files.
Timber::$dirname = [ 'templates', 'views' ];

new StarterSite();



function lk_styles_loader()
{
    $styles = get_template_directory_uri() . '/dist/css/prod.css';
    $scripts = get_template_directory_uri() . '/dist/js/custom.js';
    $alpinejs = get_template_directory_uri() .'/dist/js/packages/alpinejs/dist/cdn.min.js';
    wp_enqueue_style('lk-styles', $styles, array(), null);
    wp_enqueue_script('lk-scripts', $scripts, array(), null, true);
    wp_enqueue_script('lk-scripts-alpinejs', $alpinejs, array(), null, true);
}

add_action('wp_enqueue_scripts', 'lk_styles_loader');
