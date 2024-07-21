import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import logo from 'images/logo.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEye } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons';
import { getUserQuery } from 'hooks/user';
import { useQuery } from 'react-query';
import { useAddReadingList } from 'hooks/post';
import { AuthContext } from 'contexts/AuthContext';

const BlogCard = ({ data, hide = false }) => {
  const { user } = useContext(AuthContext);
  const [timeAgo, setTimeAgo] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const now = new Date();
    const postDate = new Date(data.createdAt);
    console.log(data.createdAt);
    const diffInMs = now - postDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMinutes < 1) setTimeAgo('just now');
    if (diffInMinutes < 60) setTimeAgo(`${diffInMinutes} minutes ago`);
    if (diffInHours < 24) setTimeAgo(`${diffInHours} hours ago`);
    setTimeAgo(
      postDate.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    );
  }, [data.createdAt]);

  const { mutate: addReadingList, isLoading: isAddingReadingList } =
    useAddReadingList(() => {
      console.log('Added to reading list');
      setAdded(true);
    });

  useEffect(() => {
    if (user?.reading_list.includes(data._id)) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [user, data._id]);

  return (
    <Card className="blog-card">
      {data.main_image && !hide && (
        <div
          className="blog-card__img"
          style={{ aspectRatio: 'auto 1000 / 420' }}
        >
          <Card.Img
            className="blog-card__img"
            variant="top"
            src={data.main_image}
            // src={userData?.profile_image_url}
          />
        </div>
      )}

      <Card.Body className="blog-card__body">
        <Link to={'/'} className="">
          <div className="gap-0 px-3 mb-2 d-flex gap-2">
            <img src={data.profile_image_url} className="blog-card__user-img" />

            <div className="blog-card__info d-flex flex-column justify-content-center">
              <p className="blog-card__user-name m-0">{data.author}</p>
              <p className="blog-card__date">{timeAgo}</p>
            </div>
          </div>
        </Link>
        <Card.Title className="blog-card__title">
          <Link
            to={`/post/:path`.replace(':path', data.slug)}
            className="text-decoration-none blog-card__title"
          >
            {data.title}
          </Link>
        </Card.Title>
        <Card.Text className="blog-card__text">
          <Row
            className="gap-0 px-2"
            style={{
              maxWidth: 'fit-content',
            }}
          >
            <Link className="blog-card__text-tag">
              <span>#{data.category_name}</span>
            </Link>
          </Row>
        </Card.Text>

        <Row className="gap-0 px-3 mb-3 justify-content-between align-items-center blog-card__misc">
          <Col className="d-flex align-items-center">
            {hide ? (
              <span>👍 {data.likes_count} like</span>
            ) : (
              <Button>👍 {data.likes_count} like</Button>
            )}
            {hide && data.comments_count === 0 ? (
              <Button>💬 Add comment</Button>
            ) : (
              <Button>💬 {data.comments_count} comments</Button>
            )}

            <div>
              <FontAwesomeIcon icon={faEye} />
              <span className="ms-2">{data.views_count} views</span>
            </div>
          </Col>

          <Col>
            <span className="read-time">{data.read_time} min read</span>
            {user?._id === data.user_id ||
              (!hide && (
                <Button
                  className="btn-bookmark"
                  onClick={() =>
                    addReadingList({ postId: data._id, add: !added })
                  }
                >
                  <FontAwesomeIcon
                    icon={added ? faBookmark : faBookmarkOutline}
                  />
                </Button>
              ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
