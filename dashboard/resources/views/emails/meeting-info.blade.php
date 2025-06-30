<?php
$links = ['https://meet.google.com/eaw-zqje-rou', 'https://meet.google.com/hrm-bmmx-fip', 'https://meet.google.com/bme-exbs-bqp'];
$randomLink = $links[array_rand($links)];
$date = date('Y-m-d', strtotime('+' . rand(1, 7) . ' days'));
$time = date('H:i', strtotime('+' . rand(1, 23) . ' hours'));
$duration = rand(15, 60); // duration in minutes

?>
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>NoForma.ai - Let's Connect: Meeting Scheduled</title>
</head>
<body>
{{--<h1>Let's Connect: Meeting Scheduled</h1>--}}
{{--<p>Hi!</p>--}}
{{--<p>Thank you for scheduling a meeting with us! We are looking forward to our conversation.</p>--}}
{{--<p>Here are the details of your meeting:</p>--}}
{{--<ul>--}}
{{--    <li><strong>Date:</strong> {{ $date }}</li>--}}
{{--    <li><strong>Time:</strong> {{ $time }}</li>--}}
{{--    <li><strong>Duration:</strong> {{ $duration }} minutes</li>--}}
{{--    <li><strong>Meeting Link:</strong> <a href="{{ $randomLink }}">{{ $randomLink }}</a></li>--}}
{{--</ul>--}}
<p>Hi,</p>

<p>Thanks for speaking with our AI video assistant — we're excited to learn more about how we can support you.</p>

<p>We've scheduled a quick discovery call to explore your needs further and see how our team can help. Here are the meeting
details:</p>

<p>
    <span style="display: inline-block; width: 20px; text-align: center;">🗓️</span> <strong>Date:</strong> {{ $date }}<br>
    <span style="display: inline-block; width: 20px; text-align: center;">🕒</span> <strong>Time:</strong> {{ $time }} IST<br>
    <span style="display: inline-block; width: 20px; text-align: center;">🔗</span> <strong>Google Meet:</strong> <a href="{{ $randomLink }}">{{ $randomLink }}</a>
</p>

<p>We'll use this time to:</p>
<ul>
    <li>Understand your project or requirements in more detail</li>
    <li>Share how we can help you</li>
    <li>Answer any quick questions you might have</li>
</ul>

<p>If you need to reschedule, feel free to reply to this email or use the original booking link.</p>

<p>Looking forward to speaking with you!</p>

</body>
</html>
