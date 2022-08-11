export interface PostsData {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  author: {
    _ref: string;
    _type: string;
  };
  body: [
    {
      _key: string;
      _type: string;
      children: [
        {
          _key: string;
          _type: string;
          marks: [];
          text: string;
        }
      ];
      markDefs: [];
      style: string;
    },
    {
      _key: string;
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    }
  ];
  description: string;
  mainImage: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  slug: {
    _type: string;
    current: string;
  };
  title: string;
}
