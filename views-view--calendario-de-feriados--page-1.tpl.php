<?php

/**
 * @file
 * Main view template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */
?>
<div class="<?php print $classes; ?>">
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <?php print $title; ?>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  
  <?php if ($header): ?>
    <div class="view-header head-block">
      
      <?php print $header; ?>

      <?php if ($exposed): ?>
        <div class="view-filters content-select">
          <?php 
          print $exposed; ?>
        </div>
      <?php endif; ?>

    </div>
  <?php endif; ?>

  <div class="sharethis-buttons">
    <span class="st_whatsapp_large" displayText="whatsapp"></span>
    <!--span class="st_fblike_large" displayText="fblike"></span-->
    <span class="st_facebook_large" displayText="facebook"></span>
    <span class="st_twitter_large" displayText="Tweet"></span>
    <span class="st_sharethis_large" displayText="ShareThis"></span>
  </div>

  <?php if ($footer): ?>
	  <div class="view-footer">
		  <?php print $footer; ?>
	  </div>
	  
  <?php endif; ?>
  <?php if ($attachment_before): ?>
    <div class="attachment attachment-before">
      <?php print $attachment_before;  ?>
    </div>
  <?php endif; ?>

  <?php if ($rows): ?>   
  <?php  
  	 if(preg_match_all('|<h3>(.*?)</h3>|is', (string)$rows , $meses)){}
  	 if(preg_match_all('|<td class="td-claendariopage1">(.*?)</td>|is', (string)$rows , $match)){}
  	$map = array();
  	$map[1]='Enero';
  	$map[2]='Febrero';
  	$map[3]='Marzo';
  	$map[4]='Abril';
  	$map[5]='Mayo';
  	$map[6]='Junio';
  	$map[7]='Julio';
  	$map[8]='Agosto';
  	$map[9]='Septiembre';
  	$map[10]='Octubre';
  	$map[11]='Noviembre';
  	$map[12]='Diciembre';
    $k=0;
    $new_rows='<tr class="tr-claendariopage1">';
    $row='';
    $j=1;
    $z = (count($meses[1])); 
    foreach ($map as $value){
    	if($value!= $meses[1][$k]){
          $new_rows.='
            <td class="td-claendariopage1">
              <div class="item-list">        
                <h3>'.$value.'</h3> 
               <ul>
                 <li class="views-row views-row-2 views-row-even views-row-last feriados">           
                   <div class="views-field views-field-field-fecha-feriado-1"><div class="field-content"></div>  </div>  
                   <div class="views-field views-field-title"></div>        
                   </li>
               </ul> 
              </div>
            </td>';                 
        }
      if($value == $meses[1][$k]){
          $new_rows.= $match[0][$k];
          $k++;
        }
      if($k==$z){
        $k--;
      }
      if($j%3==0){
          $new_rows.='</tr>';
        $row.=$new_rows;
        $new_rows ='<tr class="tr-claendariopage1">';
      } $j++;
    }
  ?>

    <div class="view-content">
    	<table class="claendariopage1">
    	  <?php print $row;?>
      	</table>
    </div>
  <?php elseif ($empty): ?>
    <div class="view-empty">
      <?php print $empty; ?>
    </div>
  <?php endif; ?>

  <?php if ($pager): ?>
    <?php print $pager; ?>
  <?php endif; ?>
  <div class="leyenda-footer">
	  <div class="lferiado"> | Días feriados</div>
	  <div class="lfestivo"> | Días festivos</div>
  </div>
  <?php if ($attachment_after): ?>
    <div class="attachment attachment-after">
      <?php print $attachment_after; ?>
    </div>
  <?php endif; ?>

  <?php if ($more): ?>
    <?php print $more; ?>
  <?php endif; ?>

  

  <?php if ($feed_icon): ?>
    <div class="feed-icon">
      <?php print $feed_icon; ?>
    </div>
  <?php endif; ?>

</div><?php /* class view */ ?>
