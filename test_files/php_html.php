<?php
include 'classes/DB.class.php';
include 'classes/DVD.class.php';

if($_SERVER['REQUEST_METHOD']=='POST')
    include 'actions.inc.php';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
    <head>
        <title>News</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body>
        <a href="catalog.php?action=catalog">Catalogue</a>
        <hr>
        <?php
        switch($_GET['action']){
            case 'anthology':
                include 'get_anthology.inc.php';break;
            case 'list':
                include 'get_list.inc.php';break;
            case 'catalog':
            default:
                include 'get_catalog.inc.php';
        }
        ?>
    </body>
</html>