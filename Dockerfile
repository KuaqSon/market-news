# Use an official Python runtime as a parent image
FROM mhart/alpine-node:10.21.0

# Set the working directory to /code
WORKDIR /code

# Copy the current directory contents into the container at /code
COPY . /code

# Install any needed packages specified in
RUN yarn install

# Make port 3001 available to the world outside this container
#EXPOSE 3001

# Define environment variable
#ENV PORT 3001

# Run app.py when the container launches
CMD ["yarn", "start"]
