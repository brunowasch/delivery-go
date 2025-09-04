package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type User struct {
	ID   string `json:"id"` // Mudando para string
	Name string `json:"name"`
	// Adicione outros campos conforme necessário
}

type Restaurant struct {
	ID   string `json:"id"` // Mudando para string
	Name string `json:"name"`
	// Adicione outros campos conforme necessário
}

type Food struct {
	ID   string `json:"id"` // Mudando para string
	Name string `json:"name"`
	// Adicione outros campos conforme necessário
}

func getUsers() {
	resp, err := http.Get("https://apifakedelivery.vercel.app/users")
	if err != nil {
		log.Fatalf("Erro ao fazer a requisição: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Erro ao ler o corpo da resposta: %v", err)
	}

	var users []User
	if err := json.Unmarshal(body, &users); err != nil {
		log.Fatalf("Erro ao fazer o unmarshal dos dados: %v", err)
	}

	// Exibindo os usuários
	for _, user := range users {
		fmt.Printf("ID: %s, Name: %s\n", user.ID, user.Name)
	}
}

func getUser(id int) {
	resp, err := http.Get(fmt.Sprintf("https://apifakedelivery.vercel.app/users/%d", id))
	if err != nil {
		log.Fatalf("Erro ao fazer a requisição: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Erro ao ler o corpo da resposta: %v", err)
	}

	var user User
	if err := json.Unmarshal(body, &user); err != nil {
		log.Fatalf("Erro ao fazer o unmarshal dos dados: %v", err)
	}

	// Exibindo o usuário
	fmt.Printf("ID: %s, Name: %s\n", user.ID, user.Name)
}

func getRestaurants() {
	resp, err := http.Get("https://apifakedelivery.vercel.app/restaurants")
	if err != nil {
		log.Fatalf("Erro ao fazer a requisição: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Erro ao ler o corpo da resposta: %v", err)
	}

	var restaurants []Restaurant
	if err := json.Unmarshal(body, &restaurants); err != nil {
		log.Fatalf("Erro ao fazer o unmarshal dos dados: %v", err)
	}

	// Exibindo os restaurantes
	for _, restaurant := range restaurants {
		fmt.Printf("ID: %s, Name: %s\n", restaurant.ID, restaurant.Name)
	}
}

func getRestaurant(id int) {
	resp, err := http.Get(fmt.Sprintf("https://apifakedelivery.vercel.app/restaurants/%d", id))
	if err != nil {
		log.Fatalf("Erro ao fazer a requisição: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Erro ao ler o corpo da resposta: %v", err)
	}

	var restaurant Restaurant
	if err := json.Unmarshal(body, &restaurant); err != nil {
		log.Fatalf("Erro ao fazer o unmarshal dos dados: %v", err)
	}

	// Exibindo o restaurante
	fmt.Printf("ID: %s, Name: %s\n", restaurant.ID, restaurant.Name)
}

func getFoods() {
	resp, err := http.Get("https://apifakedelivery.vercel.app/foods")
	if err != nil {
		log.Fatalf("Erro ao fazer a requisição: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Erro ao ler o corpo da resposta: %v", err)
	}

	var foods []Food
	if err := json.Unmarshal(body, &foods); err != nil {
		log.Fatalf("Erro ao fazer o unmarshal dos dados: %v", err)
	}

	// Exibindo os alimentos
	for _, food := range foods {
		fmt.Printf("ID: %s, Name: %s\n", food.ID, food.Name)
	}
}

func getFood(id int) {
	resp, err := http.Get(fmt.Sprintf("https://apifakedelivery.vercel.app/foods/%d", id))
	if err != nil {
		log.Fatalf("Erro ao fazer a requisição: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Erro ao ler o corpo da resposta: %v", err)
	}

	var food Food
	if err := json.Unmarshal(body, &food); err != nil {
		log.Fatalf("Erro ao fazer o unmarshal dos dados: %v", err)
	}

	// Exibindo o alimento
	fmt.Printf("ID: %s, Name: %s\n", food.ID, food.Name)
}

func main() {
	// Exemplos de chamadas para as funções
	fmt.Println("Buscando todos os usuários:")
	getUsers()

	fmt.Println("\nBuscando um usuário específico (ID 1):")
	getUser(1)

	fmt.Println("\nBuscando todos os restaurantes:")
	getRestaurants()

	fmt.Println("\nBuscando um restaurante específico (ID 1):")
	getRestaurant(1)

	fmt.Println("\nBuscando todos os alimentos:")
	getFoods()

	fmt.Println("\nBuscando um alimento específico (ID 1):")
	getFood(1)
}
