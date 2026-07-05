package com.htuan04.todo_app.repositories;

import com.htuan04.todo_app.entities.Task;
import com.htuan04.todo_app.enums.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    @Query("""
            SELECT t
            FROM Task t
            WHERE
                (CAST(:keyword AS string) IS NULL OR t.title ILIKE CONCAT('%', CAST(:keyword AS string), '%'))
            AND
                (CAST(:status AS string) IS NULL OR t.taskStatus = :status)
            """)
    Page<Task> search(@Param("keyword") String keyword, @Param("status") TaskStatus status, Pageable pageable);
}
