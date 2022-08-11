import { Comment } from './typings.d';
export interface PostsData {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  author: {
    name: string;
    image: any;
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
  comments: Comment[];
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

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
