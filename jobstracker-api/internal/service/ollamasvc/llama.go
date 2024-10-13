package ollamasvc

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"jobtrackker/internal/config"
	"net/http"
	"time"
)

type llama3 struct {
	model      string
	suffix     string
	image      string
	format     string
	options    string
	system     string
	template   string
	context    string
	stream     bool
	raw        bool
	keep_alive string
}

type Llama3 interface {
	SetModel(model string)
	SetSystem(suffix string)
	Request(prompts string) (string, error)
}

func NewLlama3() Llama3 {
	return &llama3{
		model:      "",
		suffix:     "",
		image:      "",
		format:     "",
		options:    "",
		system:     "",
		template:   "",
		context:    "",
		stream:     false,
		raw:        false,
		keep_alive: "",
	}
}

type RespStruct struct {
	Model     string    `json:"model"`
	CreatedAt time.Time `json:"created_at"`
	Response  string    `json:"response"`
	Done      bool      `json:"done"`
}

func (l *llama3) SetModel(model string) {
	l.model = model
}

func (l *llama3) SetSystem(suffix string) {
	l.system = suffix
}
func (l *llama3) Request(prompts string) (string, error) {
	// Define the API endpoint
	config := config.GetConfig()
	url := config.OllaMaServerPath + "/api/generate"

	// Prepare the request data
	data := map[string]string{
		"model":  l.model,
		"system": l.system,
		"prompt": prompts, // corrected to "prompt" based on your Python code
	}

	// Marshal the data to JSON
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return "", err
	}

	// Create the HTTP request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return "", err
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")

	// Create an HTTP client and send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		fmt.Println("Error response from server:", resp.Status)
		return "", fmt.Errorf("error response from server: %s", resp.Status)
	}

	var allText string

	// Read the entire body for debugging purposes
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return "", err
	}

	// Print the raw response for debugging

	// Reset the response body so we can read it again
	resp.Body = io.NopCloser(bytes.NewBuffer(body))

	// Create a decoder for the response body
	decoder := json.NewDecoder(resp.Body)

	// Stream and read the response body line-by-line
	for {
		var line RespStruct // Use the ApiResponse struct for decoding
		if err := decoder.Decode(&line); err == io.EOF {
			break // End of stream
		} else if err != nil {
			fmt.Println("Error decoding response:", err)
			break
		}

		// Append the response text to allText
		allText += line.Response // Access the Response field directly
	}

	return allText, nil
}
