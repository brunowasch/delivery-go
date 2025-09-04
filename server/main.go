package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Restaurant struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Food struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

var httpClient = &http.Client{
	Timeout: 10 * time.Second,
}

func fetchJSON[T any](url string, out *T) error {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return fmt.Errorf("criando request: %w", err)
	}

	resp, err := httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("fazendo request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("status %d ao acessar %s: %s", resp.StatusCode, url, string(body))
	}

	dec := json.NewDecoder(resp.Body)
	if err := dec.Decode(out); err != nil {
		return fmt.Errorf("decodificando JSON de %s: %w", url, err)
	}
	return nil
}

func listUsers() ([]User, error) {
	var users []User
	err := fetchJSON("https://apifakedelivery.vercel.app/users", &users)
	return users, err
}

func listRestaurants() ([]Restaurant, error) {
	var restaurants []Restaurant
	err := fetchJSON("https://apifakedelivery.vercel.app/restaurants", &restaurants)
	return restaurants, err
}

func listFoods() ([]Food, error) {
	var foods []Food
	err := fetchJSON("https://apifakedelivery.vercel.app/foods", &foods)
	return foods, err
}

func main() {
	users, err := listUsers()
	if err != nil {
		log.Fatalf("Erro ao listar usuários: %v", err)
	}
	fmt.Println("Usuários:")
	for _, u := range users {
		fmt.Printf("  ID: %s, Name: %s\n", u.ID, u.Name)
	}

	restaurants, err := listRestaurants()
	if err != nil {
		log.Fatalf("Erro ao listar restaurantes: %v", err)
	}
	fmt.Println("\nRestaurantes:")
	for _, r := range restaurants {
		fmt.Printf("  ID: %s, Name: %s\n", r.ID, r.Name)
	}

	foods, err := listFoods()
	if err != nil {
		log.Fatalf("Erro ao listar comidas: %v", err)
	}
	fmt.Println("\nComidas:")
	for _, f := range foods {
		fmt.Printf("  ID: %s, Name: %s\n", f.ID, f.Name)
	}
}
