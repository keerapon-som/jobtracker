import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access environment variables
GO_SERVER = os.getenv('GOSERVER')