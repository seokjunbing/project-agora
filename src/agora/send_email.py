import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_email(recipient, message, sender='agoradartmouth@gmail.com', pwd='agora123'):
    gmail_user = sender
    gmail_pwd = pwd
    FROM = sender
    TO = recipient if type(recipient) is list else [recipient]

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()
        server.login(gmail_user, gmail_pwd)
        server.sendmail(FROM, TO, message.as_string())
        server.quit()
        print('Successfully sent the email')
    except:
        print('failed to send mail')


def construct_email_msg(receiver, email_subject, html_body=None, plain_text_body=None, sender="agoradartmouth@gmail.com"):

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['From'] = sender
    msg['To'] = receiver

    if plain_text_body is None and html_body is None:
        raise Exception("both plain_text_body and html_body cannot be None!\n")

    if plain_text_body is not None:
        plain_text_ver = MIMEText(plain_text_body, 'plain')
        msg.attach(plain_text_ver)

    if html_body is not None:
        html_ver = MIMEText(html_body, 'html')
        msg.attach(html_ver)

    return msg


def construct_and_send_verification_email(userprofile, domain='http://127.0.0.1:8000/'):
    recv = userprofile.email
    name = userprofile.first_name
    token = userprofile.profile.verification_code

    verification_url = domain+'verify/?email=' + recv + '&code=' + token

    subject = "Please verify your Agora account"

    html_content = """\
    <html>
      <head></head>
      <body>
        <p>Hi %s!<br>
           How are you?<br>
           This is a message to let you know that you should verify your email address to have full access to Agora.<br>
           Please click this <a href="%s">link</a> or paste in the following link to your browser:<br>
           %s<br>
           <br>
           Best,<br>
           Your friendly team at Agora<br>
        </p>
      </body>
    </html>
    """ % (name, verification_url, verification_url)

    text_content = """\
    Hi %s!\n
    How are you?\n
    This is a message to let you know that you should verify your email address to have full access to Agora.\n
    This is the url to verify your Agora account:\n
    %s\n
    \n
    Best,\n
    Your friendly team at Agora\n
    """ % (name, verification_url)

    msg = construct_email_msg(receiver=recv, email_subject=subject, html_body=html_content, plain_text_body=text_content)
    send_email(recipient=recv, message=msg)

    pass

# example of how to construct and send an email
