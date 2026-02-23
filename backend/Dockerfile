# -------- Stage 1: Build --------
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# -------- Stage 2: Runtime --------
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy built jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Render provides dynamic PORT
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
