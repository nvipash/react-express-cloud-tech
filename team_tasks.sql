CREATE DATABASE IF NOT EXISTS team_tasks;

CREATE TABLE IF NOT EXISTS team_tasks.tasks (
  `id` int(11) NOT NULL,
  `task` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
ALTER TABLE team_tasks.tasks ADD PRIMARY KEY (`id`);
ALTER TABLE team_tasks.tasks MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO team_tasks.tasks (`id`, `task`, `status`, `created_at`) VALUES
(1, 'Find bugs', 1, '2018-04-10 23:50:40'),
(2, 'Review code', 1, '2017-04-10 23:50:40'),
(3, 'Fix bugs', 1, '2018-04-10 23:50:40'),
(4, 'Refactor Code', 1, '2017-04-10 23:50:40'),
(5, 'Push to prod', 1, '2018-04-10 23:50:50');