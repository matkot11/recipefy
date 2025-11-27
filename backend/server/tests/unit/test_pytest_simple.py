"""
Simple test to verify pytest is working correctly.
"""


def test_addition():
    """Test basic addition."""
    assert 1 + 1 == 2


def test_subtraction():
    """Test basic subtraction."""
    assert 5 - 3 == 2


def test_string_operations():
    """Test string operations."""
    assert "hello" + " " + "world" == "hello world"
    assert len("pytest") == 6


def test_list_operations():
    """Test list operations."""
    numbers = [1, 2, 3, 4, 5]
    assert len(numbers) == 5
    assert sum(numbers) == 15
    assert 3 in numbers
