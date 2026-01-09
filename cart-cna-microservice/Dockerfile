FROM gradle:8-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle build -x test

FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy ONLY the runnable jar (exclude *-plain.jar)
COPY --from=build /app/build/libs/*[^plain].jar app.jar

EXPOSE 8084
ENTRYPOINT ["java","-jar","app.jar"]

