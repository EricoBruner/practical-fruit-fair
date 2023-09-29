import app from "app";
import fruits from "data/fruits";
import supertest from "supertest";

const api = supertest(app);

describe("app", () => {
  describe("POST /fruits tests", () => {
    it("should return 201 when inserting a fruit", async () => {
      const { status } = await api.post("/fruits").send({
        name: "maça",
        price: 3.99,
      });

      expect(status).toBe(201);
    });

    it("should return 409 when inserting a fruit that is already registered", async () => {
      const { status } = await api.post("/fruits").send({
        name: "maça",
        price: 3.99,
      });

      expect(status).toBe(409);
    });

    it("should return 422 when inserting a fruit with data missing", async () => {
      const { status } = await api.post("/fruits").send({
        name: "maça",
      });

      expect(status).toBe(422);
    });
  });

  describe("GET /fruits tests", () => {
    it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async () => {
      const { status } = await api.get("/fruits/5000");

      expect(status).toBe(404);
    });

    it("should return 400 when id param is present but not valid", async () => {
      const { status } = await api.get("/fruits/abc");

      expect(status).toBe(400);
    });

    it("should return one fruit when given a valid and existing id", async () => {
      const { status, body } = await api.get("/fruits/1");

      expect(status).toBe(200);
      expect(body).toEqual(
        expect.objectContaining({
          id: 1,
          name: "maça",
          price: 3.99,
        })
      );
    });

    it("should return all fruits if no id is present", async () => {
      const { status, body } = await api.get("/fruits");

      expect(status).toBe(200);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            name: "maça",
            price: 3.99,
          }),
        ])
      );
    });
  });
});
