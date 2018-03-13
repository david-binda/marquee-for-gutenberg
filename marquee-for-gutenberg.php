<?php
/**
 * Plugin Name:     Marquee For Gutenberg
 * Plugin URI:      https://github.com/david-binda/marquee-for-gutenberg
 * Description:     Example marquee block for Gutenberg
 * Author:          David Biňovec
 * Author URI:      https://davidbinda.wordpress.com
 * Text Domain:     marquee-for-gutenberg
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Marquee_For_Gutenberg
 */

if ( false === defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/block/marquee/index.php';
