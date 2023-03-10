<?php 
/*
Plugin Name: Are you paying attention quiz
Description: The very fisrt js example plugin
Version: 1.0
Author: Li Ming

*/

if(!defined('ABSPATH')) exit;


class AreYouPayingAttention{
    function __construct(){
        add_action('init',[$this, 'adminAsssets']);
    }

    function adminAsssets(){
        // wp_enqueue_style('PayAttentionBlock-Quiz-Style', plugin_dir_url(__FILE__) . 'build/index.css');
        // wp_enqueue_script('PayAttentionBlock', plugin_dir_url(__FILE__) . 'build/index.js', ['wp-blocks','wp-element', 'wp-editor']);
        // register_block_type('payattentionplugin/are-you-paying-attention',[
        //     'editor_script'=>'PayAttentionBlock',
        //     'editor_style'=>'PayAttentionBlock-Quiz-Style',
        //     'render_callback'=>[$this, 'RenderPayAttentionBlock']
        // ]);
        register_block_type(__DIR__ . "/config/Quiz-block.json",[
            'render_callback'=>[$this, 'RenderPayAttentionBlock']
        ]);
    }

    function RenderPayAttentionBlock($attributes){
        // if(!is_admin()){
        //     wp_enqueue_script('PayAttentionBlock-frontend', plugin_dir_url(__FILE__) . 'build/frontend.js', ['wp-element']);
        //     wp_enqueue_style('PayAttentionBlock-frontend-style', plugin_dir_url(__FILE__) . 'build/frontend.css');            
        // }
        ob_start()
        ?>
        <div class="paying-attention-update-me">
            <pre style="display:none;"><?php echo wp_json_encode($attributes) ?></pre>
        </div>
        <?php
        return ob_get_clean();
        //return '<h1>The first color is '. $attributes['firstColor'] . ', and the second color is ' . $attributes['secondColor'] .'.</h1>' ;
    }
}

$AreYouPayingAttentionPlugin = new AreYouPayingAttention();