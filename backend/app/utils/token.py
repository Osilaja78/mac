"""
* Create access token.

"""

from dotenv import load_dotenv
from jose import jwt
import datetime
import os

# Load environment variables
load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_DAYS = os.getenv("ACCESS_TOKEN_EXPIRE_DAYS")

# Function that generates access token for authenticated users
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.now(tz=datetime.UTC) + datetime.timedelta(days=float(ACCESS_TOKEN_EXPIRE_DAYS))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
