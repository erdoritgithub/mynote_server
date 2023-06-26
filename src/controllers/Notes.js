import Note from "../models/NoteModel.js";
import User from "../models/UserModel.js";

class Notes{

    static addNote = async (req, res) => {
        try {
            // get cookie
            const refreshToken= req.cookies.refreshToken
            
            // find user by refresh_token
            const user = await User.findAll({
                where: {
                    refresh_token: refreshToken
                }
            })
    
            // add create note by user
            const note= await Note.create({
                title: req.body.title,
                slug: req.body.slug,
                excerpt: req.body.excerpt,
                description: req.body.description,
                author: user[0].username,
                user_id: user[0].id
            })

            const result= {
                title: note.title,
                slug: note.slug,
                excerpt: note.excerpt,
                description: note.description,
                author: note.author
            }

            res.status(200).json(result)
            
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static getAllNotes = async (req, res) => {
        try {
            // find all notes
            const notes= await Note.findAll()
            const result= {
                title: notes[0].title,
                slug: notes[0].slug,
                excerpt: notes[0].excerpt,
                description: notes[0].description,
                author: notes[0].author,
            }
            res.status(200).json(result)
        } catch (error) {
            res.status(500).send('cannot get all notes')
        }
    }

    static getAllNotesByUser= async (req, res) => {
        try {
            // get cookie
            const refreshToken= req.cookies.refreshToken
            
            // find user by refresh_token
            const user = await User.findAll({
                where: {
                    refresh_token: refreshToken
                }
            })
    
            // find notes by user
            const notes= await Note.findAll({
                where: {
                    user_id: user[0].id
                }
            })

            const result= notes.map((note) => (
                    {
                        title: note.title,
                        slug: note.slug,
                        excerpt: note.excerpt,
                        description: note.description,
                        author: note.author,
                    }
                )
            ) 

            res.status(200).json(result)
        } catch (error) {
            res.status(500).send('cannot get user notes')
        }
    }

    static getAllNotesByUserAndSlug= async (req, res) => {
        try {
            // get cookie
            const refreshToken= req.cookies.refreshToken
            
            // find user by refresh_token
            const user = await User.findAll({
                where: {
                    refresh_token: refreshToken
                }
            })
    
            // find notes by user
            const notes= await Note.findAll({
                where: {
                    user_id: user[0].id,
                    slug: req.params.slug
                }
            })

            const result= notes.map((note) => (
                    {
                        title: note.title,
                        slug: note.slug,
                        excerpt: note.excerpt,
                        description: note.description,
                        author: note.author,
                    }
                )
            ) 

            res.status(200).json(result)
        } catch (error) {
            res.status(500).send('cannot get user notes')
        }
    }

    static updateNoteByUser= async (req, res) => {
        try {
            // get cookie
            const refreshToken= req.cookies.refreshToken
            
            // find user by refresh_token
            const user = await User.findAll({
                where: {
                    refresh_token: refreshToken
                }
            })
    
            // update note by user
            const note= await Note.update( req.body, {
                where: {
                    user_id: user[0].id,
                    id: req.params.id
                }
            })

            res.status(200).json(note)
        } catch (error) {
            res.status(500).send('cannot update user notes')
        }
    }

    static deleteNoteByUser= async (req, res) => {
        try {
            // get cookie
            const refreshToken= req.cookies.refreshToken
            
            // find user by refresh_token
            const user = await User.findAll({
                where: {
                    refresh_token: refreshToken
                }
            })
    
            // delete note by user
            const note= await Note.destroy({
                where: {
                    user_id: user[0].id,
                    id: req.params.id
                }
            })

            res.status(200).json(note)
        } catch (error) {
            res.status(500).send('cannot delete user notes')
        }
    }

}

export default Notes