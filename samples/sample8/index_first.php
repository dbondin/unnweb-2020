<!DOCTYPE html>
<html>
  <head>
    <title>PHP Sample</title>
  </head>
  <body>
<?php
  # comment
  // comment
  /* comment  */
  define('USERNAME', 'Dmitry');
  $name = "Personal Home Page";
  echo "Hello " . $name;
  echo "<br>";
  $x = 1;

  function f() {
    global $x;
    static $y = 1;
    echo "This is a function, \$x=" . $x;
    echo "<br>";
    echo "\$y=" . $y;
    echo "<br>";
    $y++;
  }

  f();
  f();
  f();

  echo "Hello " . USERNAME;
  echo "<br>";

  if($x === 1) {
    echo ":)<br>";
  }
?>

    <ol>
<?php
  for($i=0;$i<10;$i++) {
    echo "<li>List item N" . $i . "\n"; 
  }
?>
    </ol>

<?php
  $a1 = array(10, 20, 30);
  echo $a1[1];
  echo "<br>";
  for($a=0; $a<count($a1); $a++) {
    echo "loop " . $a1[$a];
    echo "<br>";    
  }
  foreach($a1 as $a) {
    echo "loop again " . $a;
    echo "<br>";    
  }

  $m1 = array("john" => "lennon",
    "paul" => "mccartney",
    "ringo" => "star",
    "george" => "harisson");
  echo "Who is paul? " . $m1["paul"];
  echo "<br>";
  foreach($m1 as $k => $v) {
    echo "loop m " . $k . " " . $v;
    echo "<br>";
  }

  //echo $GLOBALS;
  //echo "<br>";
  //foreach($GLOBALS as $k => $v) {
  //  echo "\$GLOBALS " . $k . " =" . var_dump($v);
  //  echo "<br>";
  //}

  echo "_REQUEST<br>";
  var_dump($_REQUEST);

  if(array_key_exists("name", $_REQUEST)) {
    $name = $_REQUEST["name"];
    if(strlen($name) > 0) {
      echo "<h1>Hello " . $name . "</h1>";
    }
  }

  echo "_GET<br>";
  var_dump($_GET);

?>
  </body>
</html>
