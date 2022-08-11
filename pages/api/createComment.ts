// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../sanity';

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id, name, email, comment } = JSON.parse(req.body);
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'could not submit comment', error: err.message });
  } finally {
    console.log('comment submitted');
    return res.status(200).json({ message: 'comment submitted' });
  }
};
export default createComment;
