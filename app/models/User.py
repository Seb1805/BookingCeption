class User(Base):
    __tablename__ = "User"
    
    userId = Column(Integer, primary_key=True)
    firstname = Column(String(150))
    lastname = Column(String(150))
    email = Column(String(150))
    password = Column(String(150))
    address = Column(String(150))
    #disabled: Optional[bool] = False
    # username = Column(String(50), unique=True)
    #hashed_password = Column(String(255))
    
    def __repr__(self):
        return f"<User(username={self.username})>"