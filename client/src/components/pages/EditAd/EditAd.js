import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { editAdRequest, getAdById } from '../../../redux/adsRedux';
import AdForm from '../../common/AdForm/AdForm';
import { Spinner } from 'react-bootstrap';
import { checkIfLoggedIn } from '../../../redux/usersRedux';
import EditAdForm from '../../features/EditAdForm/EditAdForm';

const EditAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const adData = useSelector(state => getAdById(state, id));

  const user = useSelector(state => checkIfLoggedIn(state));

  if (!user) return <Navigate to='/' />;
  else
    return (
      <div>
        {adData === undefined ? (
          <Spinner key='spinner' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : (
          <>
            <h1> Edit your ad!</h1>
            <EditAdForm />
          </>
        )}
      </div>
    );
};

export default EditAd;
