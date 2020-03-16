<?php
    if(isset($_POST['submit']))
    {
      

        $name = $_POST['name'];
        $visitor_email = $_POST['email'];
        $visitor_website = $_POST['website'];
        $location = $_POST['location'];
        $service = $_POST['service'];
        $project_type = $_POST['project-type'];
        $timeline = $_POST['timeline'];
        $budget = $_POST['budget'];
        $target_audience = $_POST['target-audience'];
        $more_details = $_POST['more-details'];

        $email_from = 'gidi@index.html';

        $email_subject = 'I need your Service';

        $email_body = "I am $name, my email address is  $email. I am based in $location.\n".
            "I need your service with a $project_type on a $service project.\n". 
            "I need this project done in $timeline on a budget of $budget.\n". 
            "$target_audience.\n".
            "$more_details.\n".
            "$visitor_website."

        $to = "gidiblack@gmail.com";
        
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: $email_from \r\n";
        
        $headers .= "Reply-To: $visitor_email \r\n";
        if(mail($to,$email_subject,$email_body,$headers)){
            echo "<script>
                    alert('Mail has been sent Successfully.');
                </script>";
        }
        else{
            echo "<script>
                    alert('EMAIL FAILED');
                </script>";
        }
    }
 ?>