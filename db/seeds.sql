USE project2_db; 

INSERT INTO Collections (nameOfCollection, patternId, UserId, createdAt, updatedAt) VALUES ("Winter Hats", 1, 1, curdate(), curdate());
INSERT INTO Patterns (patternName, patternUrl, collectionId, createdAt, updatedAt) VALUES ("Antler Toque", "https://www.ravelry.com/patterns/library/antler-toque", 1, curdate(), curdate());
