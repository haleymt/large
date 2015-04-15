# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  description     :string
#

class User < ActiveRecord::Base
  include Followable

  validates :email, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, uniqueness: true

  has_many(
    :publications,
    class_name: :Publication,
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many(
    :stories,
    class_name: :Story,
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :followings,
    class_name: :Follow,
    foreign_key: :follower_id
  )

  has_many(
    :pub_edits,
    class_name: :PublicationEdit,
    foreign_key: :editor_id,
    primary_key: :id
  )

  has_many(
    :pub_writes,
    class_name: :PublicationWrite,
    foreign_key: :writer_id,
    primary_key: :id
  )

  has_many :contributed_pubs, through: :pub_writes, source: :publication
  has_many :edited_pubs, through: :pub_edits, source: :publication

  attr_reader :password
  after_initialize :ensure_session_token

  def gravatar_url
    "http://www.gravatar.com/avatar/#{ Digest::MD5.hexdigest(email) }"
  end

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def followed_users
    users = []
    self.followings.each do |following|
      if following.followable_type == "User"
        users << User.find(following.followable_id)
      end
    end
    return users
  end

  protected

    def ensure_session_token
      self.session_token ||= SecureRandom.urlsafe_base64(16)
    end

end
