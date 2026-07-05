package com.htuan04.todo_app.repositories;

import com.htuan04.todo_app.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
}
