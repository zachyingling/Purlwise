USE project2_db; 

INSERT INTO Collections (nameOfCollection, patternId, UserId, createdAt, updatedAt) VALUES ('Spring Sweaters', 1, 1, curdate(), curdate());
INSERT INTO Patterns (patternName, patternUrl, collectionId, createdAt, updatedAt) VALUES ("April Crochet", "www.ravelry.com", 1, curdate(), curdate());
