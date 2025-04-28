<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields and sanitize them
    $name    = htmlspecialchars(strip_tags(trim($_POST['name'])));
    $email   = htmlspecialchars(strip_tags(trim($_POST['email'])));
    $phone   = htmlspecialchars(strip_tags(trim($_POST['phone'])));
    $subject = htmlspecialchars(strip_tags(trim($_POST['subject'])));
    $message = htmlspecialchars(strip_tags(trim($_POST['message'])));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    // Email settings
    $to      = "inquiry@example.com";
    $subject = "New Contact Form Message: " . $subject;
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Email body
    $email_body  = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Here are the details:\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Phone: " . $phone . "\n";
    $email_body .= "Subject: " . $subject . "\n";
    $email_body .= "Message:\n" . $message . "\n";

    // Send the email
    if (mail($to, $subject, $email_body, $headers)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // Not a POST request
    echo "Invalid request.";
}
?>
