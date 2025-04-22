import Profile from '../models/Profile.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).select('-password');
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, bio, profilePic, banner } = req.body;
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, bio, profilePic, banner },
      { new: true }
    ).select('-password');
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllProfiles = async (req, res) => {
    try {
      const profiles = await Profile.find().select('-password');
      res.json(profiles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const followUser = async (req, res) => {
    try {
      const { followerId } = req.body;
      const userToFollow = await Profile.findById(req.params.id);
      const follower = await Profile.findById(followerId);
  
      if (!userToFollow || !follower)
        return res.status(404).json({ error: 'User not found' });
  
      if (!userToFollow.followers.includes(followerId)) {
        userToFollow.followers.push(followerId);
        await userToFollow.save();
      }
  
      if (!follower.following.includes(req.params.id)) {
        follower.following.push(req.params.id);
        await follower.save();
      }
  
      res.json({ message: 'Followed successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };