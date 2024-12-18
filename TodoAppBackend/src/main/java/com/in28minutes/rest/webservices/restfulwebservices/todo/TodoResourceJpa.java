package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class TodoResourceJpa {

    private final TodoRepository todoRepository;

    public TodoResourceJpa(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // Retrieve all todos for a specific username
    @GetMapping("/users/{username}/todos")
    public List<Todo> retrieveTodos(@PathVariable String username) {
        return todoRepository.findByUsername(username);
    }

    // Retrieve a specific todo by ID
    @GetMapping("/users/{username}/todos/{id}")
    public Optional<Todo> retrieveTodo(@PathVariable String username,
                                       @PathVariable int id) {
        return todoRepository.findById(id);
    }

    // Delete a specific todo by ID
    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username,
                                           @PathVariable int id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update an existing todo
    @PutMapping("/users/{username}/todos/{id}")
    public Todo updateTodo(@PathVariable String username,
                           @PathVariable int id,
                           @RequestBody Todo todoRequest) {
        // Find the existing Todo
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));

        // Update fields
        existingTodo.setDescription(todoRequest.getDescription());
        existingTodo.setTargetDate(todoRequest.getTargetDate());
        existingTodo.setDone(todoRequest.isDone());

        // Save and return the updated Todo
        return todoRepository.save(existingTodo);
    }

    // Create a new todo
    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Todo> createTodo(@PathVariable String username,
                                           @RequestBody Todo todo) {
        // Set the username for the new Todo
        todo.setUsername(username);

        // Save the new Todo
        Todo savedTodo = todoRepository.save(todo);

        // Build the location URI for the created Todo
        URI location = URI.create(String.format("/users/%s/todos/%d", username, savedTodo.getId()));

        // Return the response entity with the location header
        return ResponseEntity.created(location).body(savedTodo);
    }
}
