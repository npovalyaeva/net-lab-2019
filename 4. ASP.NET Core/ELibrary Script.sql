USE [elibrarydb]
GO
/****** Object:  Table [dbo].[Authors]    Script Date: 8/20/2019 4:38:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Authors](
	[author_id] [smallint] IDENTITY(1,1) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[patronymic] [varchar](50) NULL,
 CONSTRAINT [PK_authors] PRIMARY KEY CLUSTERED 
(
	[author_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Books]    Script Date: 8/20/2019 4:38:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[book_id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](100) NOT NULL,
	[author_id] [smallint] NOT NULL,
	[year] [smallint] NOT NULL,
	[cover] [varbinary](max) NULL,
	[copies_count] [tinyint] NOT NULL,
	[free_copies_count] [tinyint] NOT NULL,
 CONSTRAINT [PK_books] PRIMARY KEY CLUSTERED 
(
	[book_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 8/20/2019 4:38:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[comment_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[book_id] [int] NOT NULL,
	[Comment] [text] NOT NULL,
	[date] [datetime] NOT NULL,
 CONSTRAINT [PK_comments] PRIMARY KEY CLUSTERED 
(
	[comment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reservations]    Script Date: 8/20/2019 4:38:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reservations](
	[reservation_id] [bigint] IDENTITY(1,1) NOT NULL,
	[status_id] [tinyint] NOT NULL,
	[book_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
	[date_of_reservation] [datetime] NOT NULL,
 CONSTRAINT [PK_not_free_instances] PRIMARY KEY CLUSTERED 
(
	[reservation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 8/20/2019 4:38:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[role_id] [tinyint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_roles] PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Statuses]    Script Date: 8/20/2019 4:38:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Statuses](
	[status_id] [tinyint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Statuses_1] PRIMARY KEY CLUSTERED 
(
	[status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 8/20/2019 4:38:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[role_id] [tinyint] NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password_hash] [varchar](50) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[is_blocked] [bit] NOT NULL,
 CONSTRAINT [PK_users_1] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Authors] ON 

INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (1, N'Pushkin', N'Alexander', N'Sergeyevich')
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (2, N'Solzhenitsyn', N'Alexander', N'Isayevich')
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (3, N'Turgenev', N'Ivan', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (4, N'Nabokov', N'Vladimir', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (5, N'Bulgakov', N'Mikhail', N'Afanasyevich')
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (6, N'Chekhov', N'Anton', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (7, N'Bunin', N'Ivan', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (8, N'Gogol', N'Nikolai', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (9, N'Dostoyevsky', N'Fyodor', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (10, N'Tolstoy', N'Leo', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (11, N'Mayakovsky', N'Vladimir', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (12, N'Lermontov', N'Mikhail', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (13, N'Yesenin', N'Sergei', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (14, N'Tolstoy', N'Aleksey', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (15, N'Gorky', N'Maxim', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (16, N'Pasternak', N'Boris', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (17, N'Kupala', N'Yanka', NULL)
INSERT [dbo].[Authors] ([author_id], [last_name], [first_name], [patronymic]) VALUES (18, N'Kolas', N'Yakub', N'')
SET IDENTITY_INSERT [dbo].[Authors] OFF
SET IDENTITY_INSERT [dbo].[Books] ON 

INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (1, N'The Idiot', 9, 1869, NULL, 10, 10)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (2, N'Demons', 9, 1872, NULL, 5, 5)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (3, N'Crime and Punishment', 9, 1866, NULL, 13, 13)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (4, N'Dream on a Barrow', 17, 1910, NULL, 8, 8)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (5, N'The White Guard', 5, 1926, NULL, 15, 15)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (6, N'The Master and Margarita', 5, 1967, NULL, 20, 20)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (7, N'A Country Doctor''s Notebook', 5, 1975, NULL, 11, 11)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (8, N'Heart of a Dog', 5, 1968, NULL, 7, 7)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (9, N'The Captain''s Daughter', 1, 1836, NULL, 15, 15)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (10, N'The Tales of the Late Ivan Petrovich Belkin', 1, 1831, NULL, 6, 6)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (11, N'Dubrovsky', 1, 1841, NULL, 13, 13)
INSERT [dbo].[Books] ([book_id], [title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (12, N'One Day in the Life of Ivan Denisovich', 2, 1962, NULL, 8, 8)
SET IDENTITY_INSERT [dbo].[Books] OFF
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([role_id], [name]) VALUES (1, N'User')
INSERT [dbo].[Roles] ([role_id], [name]) VALUES (2, N'Moderator')
SET IDENTITY_INSERT [dbo].[Roles] OFF
SET IDENTITY_INSERT [dbo].[Statuses] ON 

INSERT [dbo].[Statuses] ([status_id], [name]) VALUES (1, N'Booked')
INSERT [dbo].[Statuses] ([status_id], [name]) VALUES (2, N'Handed out')
SET IDENTITY_INSERT [dbo].[Statuses] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([user_id], [username], [role_id], [email], [password_hash], [first_name], [last_name], [is_blocked]) VALUES (1, N'admin', 2, N'admin@admin.com', N'C4CA4238A0B923820DCC509A6F75849B', N'Administrator', N'Administrator', 0)
INSERT [dbo].[Users] ([user_id], [username], [role_id], [email], [password_hash], [first_name], [last_name], [is_blocked]) VALUES (2, N'test', 1, N'test@test.com', N'C4CA4238A0B923820DCC509A6F75849B', N'Test', N'Test', 0)
INSERT [dbo].[Users] ([user_id], [username], [role_id], [email], [password_hash], [first_name], [last_name], [is_blocked]) VALUES (3, N'user', 1, N'user@user.com', N'C4CA4238A0B923820DCC509A6F75849B', N'User', N'User', 0)
INSERT [dbo].[Users] ([user_id], [username], [role_id], [email], [password_hash], [first_name], [last_name], [is_blocked]) VALUES (4, N'ssawinsp', 1, N'iriejamaica@outlook.com', N'C4CA4238A0B923820DCC509A6F75849B', N'Nadya', N'Povalyaeva', 0)
INSERT [dbo].[Users] ([user_id], [username], [role_id], [email], [password_hash], [first_name], [last_name], [is_blocked]) VALUES (5, N'useragain', 1, N'useragain@user.com', N'C4CA4238A0B923820DCC509A6F75849B', N'User', N'Again', 0)
SET IDENTITY_INSERT [dbo].[Users] OFF
ALTER TABLE [dbo].[Books]  WITH CHECK ADD  CONSTRAINT [FK_books_authors] FOREIGN KEY([author_id])
REFERENCES [dbo].[Authors] ([author_id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Books] CHECK CONSTRAINT [FK_books_authors]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_comments_books] FOREIGN KEY([book_id])
REFERENCES [dbo].[Books] ([book_id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_comments_books]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_comments_users] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_comments_users]
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD  CONSTRAINT [FK_reservations_books] FOREIGN KEY([book_id])
REFERENCES [dbo].[Books] ([book_id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Reservations] CHECK CONSTRAINT [FK_reservations_books]
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD  CONSTRAINT [FK_Reservations_Statuses] FOREIGN KEY([status_id])
REFERENCES [dbo].[Statuses] ([status_id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Reservations] CHECK CONSTRAINT [FK_Reservations_Statuses]
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD  CONSTRAINT [FK_reservations_users] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Reservations] CHECK CONSTRAINT [FK_reservations_users]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_users_roles] FOREIGN KEY([role_id])
REFERENCES [dbo].[Roles] ([role_id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_users_roles]
GO
/****** Object:  Trigger [dbo].[Reservations_AFTER_DELETE]    Script Date: 8/20/2019 4:38:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[Reservations_AFTER_DELETE] 
   ON  [dbo].[Reservations]
   AFTER DELETE
AS 
BEGIN
	DECLARE @bookedCopyId INT
	DECLARE @freeCopiesCount INT

	SELECT @bookedCopyId = (SELECT book_id FROM deleted) 
	SELECT @freeCopiesCount = (SELECT free_copies_count FROM Books WHERE book_id = @bookedCopyId)

	UPDATE Books
	SET free_copies_count = @freeCopiesCount + 1 
	WHERE book_id = @bookedCopyId
END
GO
ALTER TABLE [dbo].[Reservations] ENABLE TRIGGER [Reservations_AFTER_DELETE]
GO
/****** Object:  Trigger [dbo].[Reservations_AFTER_INSERT]    Script Date: 8/20/2019 4:38:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[Reservations_AFTER_INSERT] 
   ON  [dbo].[Reservations]
   AFTER INSERT
AS 
BEGIN
	DECLARE @bookedCopyId INT
	DECLARE @freeCopiesCount INT

	SELECT @bookedCopyId = (SELECT book_id FROM inserted) 
	SELECT @freeCopiesCount = (SELECT free_copies_count FROM Books WHERE book_id = @bookedCopyId)

	UPDATE Books
	SET free_copies_count = @freeCopiesCount - 1 
	WHERE book_id = @bookedCopyId
END
GO
ALTER TABLE [dbo].[Reservations] ENABLE TRIGGER [Reservations_AFTER_INSERT]
GO
