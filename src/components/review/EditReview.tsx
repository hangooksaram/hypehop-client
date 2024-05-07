import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Button, Box, Input, Typography, Container, MenuItem, Select } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditorBox from './EditorBox';
import BASE_URL from '../../config';
import TrackListForEdit from './TrackListForEdit';

function EditReview({ data, albumData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reviewContent, setReviewContent] = useState('');
  const [isTrackListOpened, SetsTrackListOpened] = useState(false);
  const [parentTrackRatingForEdit, setParentTrackRatingForEdit] = useState(data?.review.tracks);

  const handleTrackRatingForEditUpdate = (updatedTrackRatingForEdit) => {
    setParentTrackRatingForEdit(updatedTrackRatingForEdit);
  };
  // const [trackRating, setTrackRating] = useState<(number | null)[]>([]);

  const handleContentChange = (newContent) => {
    setReviewContent(newContent);
  };

  const handleOpen = () => {
    SetsTrackListOpened(!isTrackListOpened);
  };

  const [formData, setFormData] = useState({
    title: '',
    status: 'public',
    albumRating: 0,
    body: '',
  });

  useEffect(() => {
    let reviewBodyData;
    if (data) {
      if (data.review.body === '') {
        reviewBodyData = ' ';
      } else {
        reviewBodyData = data?.review.body;
      }
      // setReviewContent(data?.review.body);
      setReviewContent(reviewBodyData);
      setFormData({
        ...formData,
        title: data?.review.title,
        status: data?.review.status,
        albumRating: data?.review.albumRating,
        // body: data?.review.body,
        body: reviewBodyData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.albumRating !== 0 && formData.title !== '') {
      const combinedData = {
        ...formData,
        tracks: parentTrackRatingForEdit,
        body: reviewContent,
      };

      fetch(`${BASE_URL}/album/api/review/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      })
        .then((response) => response.json())
        .then(() => {
          navigate(`/album/review/${id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (formData.albumRating === 0) {
      if (typeof window !== 'undefined') {
        window.alert('평점을 입력해주세요');
      }
    } else if (formData.title === '') {
      alert('앨범평을 입력해주세요');
    }
  };

  return (
    <Container className="Edit-review" sx={{ mt: '40px' }}>
      <form>
        <Typography variant="h1">앨범 평점</Typography>
        <Box
          sx={{
            mt: '16px',
            background: 'rgb(22, 22, 22)',
            borderRadius: '16px',
            border: '1px solid rgb(52, 52, 52)',
            mb: '62px',
          }}
        >
          <Stack sx={{ height: '74px', justifyContent: 'center', ml: '20px', mr: '20px' }} spacing={1}>
            <Box sx={{ display: 'flex' }}>
              <Box
                component="img"
                width="60px"
                height="60px"
                src={data?.review.thumbnail}
                sx={{ borderRadius: '6.6px', marginRight: '20px' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography
                  textAlign="left"
                  fontSize="fontSizeMd"
                  fontWeight="fontWeightBold"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {data?.review.albumName}
                </Typography>
                <Typography
                  fontSize="fontSizeSm"
                  textAlign="left"
                  fontWeight="fontWeightLight"
                  sx={{ whiteSpace: 'nowrap', alignContent: 'center', color: 'grey.main' }}
                >
                  {data?.review.artists}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', alignItems: 'center' }}>
                <Rating
                  size="small"
                  name="albumRating"
                  value={formData.albumRating}
                  precision={0.5}
                  onChange={handleFormData}
                  sx={{ mr: '3px' }}
                />

                <Typography fontSize="fontSizeMd" fontWeight="fontWeightRegular" sx={{ alignContent: 'center' }}>
                  {Number(formData.albumRating).toFixed(1)}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h1">트랙별 평점</Typography>

          <Button size="small" variant="outlined" onClick={handleOpen}>
            <Typography fontSize="fontSizeMd" fontWeight="fontWeightRegular">
              {isTrackListOpened ? `트랙리스트 닫기` : '트랙리스트 열기'}
            </Typography>
            {isTrackListOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
        </Box>
        {isTrackListOpened ? (
          <TrackListForEdit
            data={data}
            onUpdateTrackRatingForEdit={handleTrackRatingForEditUpdate}
            albumData={albumData}
          />
        ) : (
          <Box
            sx={{
              mt: '16px',
              background: 'rgb(22, 22, 22)',
              borderRadius: '16px',
              border: '1px solid rgb(52, 52, 52)',
              mb: '62px',
              height: '46px',
              alignContent: 'center',
            }}
          >
            <Typography
              fontSize="fontSizeMd"
              fontWeight="fontWeightRegular"
              ml="20px"
              textAlign="left"
              sx={{
                color: 'grey.main',
              }}
            >
              트랙리스트를 열어 확인하세요.
            </Typography>
          </Box>
        )}

        <div className="row">
          <Box
            className="input-field"
            sx={{
              mt: '16px',
              mb: '40px',
            }}
          >
            <label htmlFor="status">
              {' '}
              <Typography sx={{ mb: '16px' }} variant="h1">
                공개여부
              </Typography>
            </label>

            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleFormData}
              fullWidth
              inputProps={{
                sx: {
                  '&:focus': {
                    border: '1px solid',
                    borderColor: 'rgb(52, 52, 52)',
                  },
                },
              }}
              MenuProps={{
                sx: {
                  '.MuiMenuItem-root': {
                    background: 'rgb(22, 22, 22)',
                    color: 'grey',
                    height: '48px',
                  },
                  '&& .Mui-selected': {
                    border: '1px solid',
                    borderColor: 'rgb(52, 52, 52)',
                    background: 'rgb(46, 45, 45)',
                  },
                },
              }}
            >
              <MenuItem value="public" selected>
                <Typography textAlign="left">공개</Typography>
              </MenuItem>
              <MenuItem value="private">
                <Typography textAlign="left">비공개</Typography>
              </MenuItem>
            </Select>
          </Box>
        </div>

        <Typography sx={{ mt: '62px' }} variant="h1">
          리뷰 작성하기
        </Typography>
        <div className="row">
          <div className="input-field">
            <Input
              fullWidth
              type="text"
              id="title"
              name="title"
              onChange={handleFormData}
              value={formData.title}
              placeholder="제목을 입력하세요"
              required
              sx={{ mt: '16px' }}
            />
            <label htmlFor="title" />
          </div>

          <EditorBox onContentChange={handleContentChange} value={formData.body} />
        </div>

        <Button variant="outlined" size="small" type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </form>
    </Container>
  );
}

export default EditReview;
