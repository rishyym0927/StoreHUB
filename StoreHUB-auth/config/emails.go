package config

import (
	"fmt"
	"os"
	"gopkg.in/gomail.v2"
	"github.com/rishyym0927/StoreHUB-auth/models"
)

func SendWelcomeEmail(toEmail, firstName string) error {
	senderEmail := os.Getenv("EMAIL")
	senderPassword := os.Getenv("PASSWORD")
	smtpHost := "smtp.gmail.com"
	smtpPort := 587

	fmt.Println("Sender Email:", senderEmail)
	fmt.Println("Sender Password:", senderPassword)

	m := gomail.NewMessage()
	m.SetHeader("From", senderEmail)
	m.SetHeader("To", toEmail)
	m.SetHeader("Subject", "Welcome to StoreHUB 🚀")
	m.SetBody("text/html", fmt.Sprintf(`
    <h1>Hello, %s!</h1>
    <p>Welcome to <strong>StoreHUB</strong>! 🎉</p>
    <p>We’re thrilled to have you on board. StoreHUB is your go-to platform for discovering, sharing, and integrating code components seamlessly. With a growing library of reusable code snippets, you’ll be able to accelerate your development workflow like never before.</p>
    <p>Here’s what you can expect:</p>
    <ul>
        <li>🚀 <strong>Explore a vast library of components</strong> across multiple frameworks.</li>
        <li>🤝 <strong>Collaborate with a vibrant community</strong> of developers.</li>
        <li>📊 <strong>Gain insights</strong> into the most popular components and community feedback.</li>
    </ul>
    <p>Ready to get started? Dive into the <a href="https://github.com/yourusername/storehub" target="_blank">StoreHUB repository</a> and start exploring today!</p>
    <p>Feel free to reach out if you need any assistance or have any questions. We’re here to help!</p>
    <p>Happy coding! 👩‍💻👨‍💻</p>
    <p><em>The StoreHUB Team</em></p>
    `, firstName))

	d := gomail.NewDialer(smtpHost, smtpPort, senderEmail, senderPassword)

	if err := d.DialAndSend(m); err != nil {
		fmt.Println("Error sending email:", err)
		return err
	}

	return nil
}

func SendPostCreationEmail(toEmail, firstName string, post models.Post) error {
	senderEmail := os.Getenv("EMAIL")
	senderPassword := os.Getenv("PASSWORD")
	smtpHost := "smtp.gmail.com"
	smtpPort := 587

	m := gomail.NewMessage()
	m.SetHeader("From", senderEmail)
	m.SetHeader("To", toEmail)
	m.SetHeader("Subject", fmt.Sprintf("Your Post \"%s\" is Live on StoreHUB 🚀", post.Title))
	m.SetBody("text/html", fmt.Sprintf(`
    <h1>Congratulations, %s!</h1>
    <p>Your post titled "<strong>%s</strong>" has been successfully created and is now live on StoreHUB. 🎉</p>
    <p>Here are the details of your post:</p>
    <ul>
        <li><strong>Title:</strong> %s</li>
        <li><strong>Description:</strong> %s</li>
        <li><strong>Framework:</strong> %s</li>
        <li><strong>Component Type:</strong> %s</li>
        <li><strong>Code Snippet:</strong> <pre>%s</pre></li>
        <li><strong>Images:</strong> %s</li>
    </ul>
    <p>Thank you for sharing your valuable component with the community! We are excited to have you as part of the StoreHUB ecosystem. 🌟</p>
    <p>To explore more, visit <a href="https://github.com/yourusername/storehub" target="_blank">StoreHUB</a> and keep contributing.</p>
    <p>Happy coding! 👩‍💻👨‍💻</p>
    <p><em>The StoreHUB Team</em></p>
    `, firstName, post.Title, post.Title, post.Description, post.Framework, post.ComponentType, post.CodeSnippet, post.Images))

	d := gomail.NewDialer(smtpHost, smtpPort, senderEmail, senderPassword)

	if err := d.DialAndSend(m); err != nil {
		return err
	}
	return nil
}
