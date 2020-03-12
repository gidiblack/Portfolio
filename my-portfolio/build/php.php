<?php
$name = $_POST['name'];
$email = $_POST['email'];

mail($email, $name, "Thank you");
?>