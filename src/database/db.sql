-- SQLite
-- JobTypes definition


CREATE TABLE JobTypes (
	JobTypeId INTEGER PRIMARY KEY AUTOINCREMENT,
	Name text NULL
);


CREATE TABLE OngType (
	OngTypeId INTEGER PRIMARY KEY AUTOINCREMENT,
	Name text NULL
);


CREATE TABLE Roles (
	RoleId INTEGER PRIMARY KEY AUTOINCREMENT,
	Name text NULL
);


CREATE TABLE Users (
	User_Id uuid NOT NULL,
	Name text NOT NULL,
	Email text NOT NULL,
	AvatarLink text NULL,
	Hash text NOT NULL,
	Salt text NOT NULL,
	RoleId INTEGER NOT NULL,
	CreatedAt timestamptz NULL,
	LastUpdatedAt timestamptz NULL,
	CONSTRAINT AK_Users_Email UNIQUE (Email),
	CONSTRAINT PK_Users PRIMARY KEY (User_Id),
	CONSTRAINT FK_Users_Roles_RoleId FOREIGN KEY (RoleId) REFERENCES Roles(RoleId) ON DELETE CASCADE
);


CREATE TABLE Assistants (
	AssistantId INTEGER PRIMARY KEY AUTOINCREMENT,
	Name text NOT NULL,
	Cnpj_Cpf text NOT NULL,
	Phone text NULL,
	Cep text NOT NULL,
	Email text NOT NULL,
	UserId uuid NOT NULL,
	CONSTRAINT AK_Assistants_Cnpj_Cpf UNIQUE (Cnpj_Cpf),
	CONSTRAINT AK_Assistants_Email UNIQUE (Email),
	CONSTRAINT FK_Assistants_Users_UserId FOREIGN KEY (UserId) REFERENCES Users(User_Id) ON DELETE CASCADE
);


CREATE TABLE Ong (
	OngId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	OngName text NOT NULL,
	Cnpj text NOT NULL,
	Cep text NOT NULL,
	Email text NOT NULL,
	UserId uuid NOT NULL,
	OngTypeId INTEGER NOT NULL,
	CONSTRAINT AK_Ong_Cnpj UNIQUE (Cnpj),
	CONSTRAINT AK_Ong_Email UNIQUE (Email),
	CONSTRAINT FK_Ong_OngType_OngTypeId FOREIGN KEY (OngTypeId) REFERENCES OngType(OngTypeId) ON DELETE CASCADE,
	CONSTRAINT FK_Ong_Users_UserId FOREIGN KEY (UserId) REFERENCES Users(User_Id) ON DELETE CASCADE
);


CREATE TABLE Posts (
	PostId uuid NOT NULL,
	Title varchar(50) NOT NULL,
	Content text NOT NULL,
	OngId INTEGER NOT NULL,
	AssistantId INTEGER NULL,
	CreatedAt timestamptz NOT NULL,
	FinishedAt timestamptz NULL,
	AssignedAt timestamptz NULL,
	StartDate timestamptz NULL,
	FinishDate timestamptz NULL,
	CONSTRAINT PK_Posts PRIMARY KEY (PostId),
	CONSTRAINT FK_Posts_Assistants_AssistantId FOREIGN KEY (AssistantId) REFERENCES Assistants(AssistantId),
	CONSTRAINT FK_Posts_Ong_OngId FOREIGN KEY (OngId) REFERENCES Ong(OngId) ON DELETE CASCADE
);