# In your DB, create a database named “send_socket_event_to_specific_users”. In that database, create a users table:


 CREATE TABLE `users` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL
);

# Add few rows in that table so we can show them in a list or a table.

INSERT INTO `users` (`id`, `name`) VALUES
(1, 'Adnan'),
(2, 'Afzal'),
(3, 'John'),
(4, 'Doe');




