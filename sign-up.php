
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Log in</title>
</head>
<body>
    <?php

        if(isset( $_POST['submit']))
        {
            $title = $_POST['titleForm'];
            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $streetAddress = $_POST['streetAddress'];
            $city = $_POST['city'];
            $postalCode = $_POST['postalCode'];

            $emailAddress = $_POST['emailAddress'];
            $confirmEmailAddress = $_POST['confirmEmailAddress'];
            if(!($emailAddress == $_POST['confirmEmailAddress']))
            {
                echo "<script>alert('Email addresses do not match.');document.location='sign-up.html'</script>";
                exit();
            }
            $password = $_POST['password'];
            $confirmPassword = $_POST['confirmPassword'];
            if(!($password == $_POST['confirmPassword']))
            {
                echo "<script>alert('Passwords do not match.');document.location='sign-up.html'</script>";
                exit();
            }

            $users_doc = new DOMDocument();
            $users_doc->preserveWhiteSpace = false;
            $users_doc->formatOutput = true;
            $users_doc->load("users.xml");
            
            $users = $users_doc->getElementsByTagName('user');

            foreach ($users AS $element)
            {
                $login_info = $element->getElementsByTagName('login')->item(0);
                if(strcasecmp($emailAddress, $login_info->getElementsByTagName('email')->item(0)->nodeValue) == 0)
                {
                    echo "<script>alert('Email address already in use.'); document.location='sign-up.html'</script>";
                    exit();
                }
            }

            $new_user = $users_doc->createElement("user");
            $new_login = $users_doc->createElement("login");
            $new_email = $users_doc->createElement("email", $emailAddress);
            $new_password = $users_doc->createElement("password", $password);
            $new_admin = $users_doc->createElement("admin", "False");
            $new_login->appendChild($new_email);
            $new_login->appendChild($new_password);
            $new_login->appendChild($new_admin);
            $new_user->appendChild($new_login);
            $new_personal = $users_doc->createElement("personal");
            $new_title = $users_doc->createElement("title", $title);
            $new_firstName = $users_doc->createElement("firstName", $firstName);
            $new_lastName = $users_doc->createElement("lastName", $lastName);
            $new_streetAddress = $users_doc->createElement("streetAddress", $streetAddress);
            $new_city = $users_doc->createElement("city", $city);
            $new_postalCode = $users_doc->createElement("postalCode", $postalCode);
            $new_personal->appendChild($new_title);
            $new_personal->appendChild($new_firstName);
            $new_personal->appendChild($new_lastName);
            $new_personal->appendChild($new_streetAddress);
            $new_personal->appendChild($new_city);
            $new_personal->appendChild($new_postalCode);
            $new_user->appendChild($new_personal);
            
            $users_doc->getElementsByTagName('users')->item(0)->appendChild($new_user);

            $users_doc->save("users.xml");

        }
    ?>
</body>
</html>
