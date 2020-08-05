describe("Gilded Rose", () => {
  describe("basic functionality", () => {
    beforeEach(() => {
      const normalItem = new Item("normalItem", 5, 10);
      items.push(normalItem);
      update_quality();
    });

    afterEach(() => {
      items = [];
    });

    it("lowers the quality of a normal item by 1", () => {
      expect(items[0].quality).toEqual(9);
    });

    it("lowers the sell in value of a normal item by 1", () => {
      expect(items[0].sell_in).toEqual(4);
    });
  });
});
