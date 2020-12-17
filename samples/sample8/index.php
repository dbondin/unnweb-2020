<!DOCTYPE html>
<html>
  <head>
    <title>PHP Sample</title>
  </head>
  <body>
    <h1>Type New Message:</h1>
    <form method="GET">
      <input type="hidden" name="command" value="create"></input>
      <input type="text" name="message"></input>
      <br>
      <input type="submit"></input>
    </form>
    <h1>Existing Messages:</h1>
  <ul>
<?php

  $conn = new mysqli("localhost", "unndb", "qwerty", "unndb");

  if(array_key_exists("command", $_GET)) {
    $command = $_REQUEST["command"];
    if($command === "create") {
      if(array_key_exists("message", $_GET)) {
        $message = $_REQUEST["message"];
        $prep = $conn->prepare("INSERT INTO message(text) VALUES (?)");
        $prep->bind_param("s", $message);
        $prep->execute();
        $prep->close();
      }
    }
    else if($command === "delete") {
      if(array_key_exists("message-id", $_GET)) {
	$message_id = $_REQUEST["message-id"];
	$prep = $conn->prepare("DELETE FROM message WHERE id = ?");
        $prep->bind_param("i", $message_id);
        $prep->execute();
        $prep->close();
      }
    }
  }

  $result = $conn->query("SELECT * FROM message ORDER BY id");
  while($row = $result->fetch_assoc()) {
    echo "<li>";
    echo "<form method='GET'>";
    echo "<input type='hidden' name='command' value='delete'></input>";
    echo "<input type='hidden' name='message-id' value='" . $row["id"] . "'></input>";
    echo "<input type='submit' value='del'></input>";
    echo "<b>id: " . $row["id"] . "</b> " . htmlspecialchars($row["text"]);
    echo "</form>";
  }

  $conn->close();
?>  
  </ul>
  </body>
</html>
