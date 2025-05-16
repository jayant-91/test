package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "hello world")
	})

	if err := http.ListenAndServe(":8086", nil); err != nil {
		fmt.Println("server error:", err)
	}
}
