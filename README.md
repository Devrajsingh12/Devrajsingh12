<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Web Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        header {
            background-color: #333;
            color: #fff;
            padding: 1em;
            text-align: center;
        }

        nav {
            display: flex;
            justify-content: center;
            background-color: #444;
        }

        nav a {
            color: #fff;
            padding: 1em;
            text-decoration: none;
            text-align: center;
        }

        nav a:hover {
            background-color: #555;
        }

        main {
            padding: 1em;
        }

        footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 1em;
            position: fixed;
            width: 100%;
            bottom: 0;
        }

        .content {
            max-width: 1200px;
            margin: auto;
        }

        .box {
            background-color: #f4f4f4;
            padding: 2em;
            margin: 1em 0;
        }

        @media (max-width: 768px) {
            nav {
                flex-direction: column;
            }

            .box {
                padding: 1em;
                margin: 0.5em 0;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>My Responsive Web Page</h1>
    </header>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </nav>
    <main>
        <div class="content">
            <div class="box" id="home">
                <h2>Home</h2>
                <p>Welcome to our website!</p>
            </div>
            <div class="box" id="about">
                <h2>About</h2>
                <p>We are a company that values excellence.</p>
            </div>
            <div class="box" id="services">
                <h2>Services</h2>
                <p>We offer a wide range of services to meet your needs.</p>
            </div>
            <div class="box" id="contact">
                <h2>Contact</h2>
                <p>Get in touch with us through our contact form.</p>
            </div>
        </div>
    </main>
    <footer>
        <p>&copy; 2024 My Company</p>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    let targetId = event.target.getAttribute('href').substring(1);
                    let targetElement = document.getElementById(targetId);
                    window.scrollTo({
                        top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                        behavior: 'smooth'
                    });
                });
            });
        });
    </script>
</body>
</html>
