app.post('/api/sessions/start', async (req, res) => {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: "userId es requerido" });
    }
  
    const newSession = await db.createSession(userId); 
    res.json({ sessionId: newSession.id });
  });
  