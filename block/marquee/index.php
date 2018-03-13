<?php
/**
 * BLOCK: Marquee
 *
 * Gutenberg Marquee block assets.
 *
 * @since 0.1.0
 * @package         Marquee_For_Gutenberg
 */

if ( false === defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_script(
		'david-binda-marquee',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
	);
} );
