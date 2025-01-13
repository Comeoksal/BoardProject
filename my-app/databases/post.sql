select post.id, title, content, created, writer, email from myboard.post
Left Join myboard.profile on post.profile_id = profile.id;